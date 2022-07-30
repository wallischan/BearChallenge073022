'reach 0.1';

const countdown = 20;

const shared = {
  showtime: Fun([UInt], Null),
}

export const main = Reach.App(() => {
  const A = Participant('Alice', {
    ...shared,
    // Specify Alice's interact interface here
    inherit: UInt,
    getchoice: Fun([],Bool),
  });
  const B = Participant('Bob', {
    ...shared,
    // Specify Bob's interact interface here
    accept_terms: Fun([UInt],Bool),
  });
  init();

  A.only(() => {
    const value = declassify(interact.inherit);

  })
  // The first one to publish deploys the contract
  A.publish(value)
    .pay(value);
  commit();
  // The second one to publish always attaches
  B.only(()=>{
    const terms = declassify(interact.accept_terms(value));
  })
  B.publish(terms);
  commit();

  each([A,B], () => {
    interact.showtime(countdown);
  })

  A.only(()=> {
    const stillhere= declassify(interact.getchoice());
  })

  A.publish(stillhere);
  if (stillhere){
    transfer(value).to(A);
  } else {
    transfer(value).to(B);
  }

  commit();
  // write your program here
  exit();
});
