const { novu } = require("../config/novu");

const addNewSubscriber = async (id, data) => {
  const { email, full_name} = data;
  await novu.subscribers.identify(id, {
    email,
    firstName: full_name
  });
};

const sendMail = async (identifier, subscriberId, activationURL = "") => {
  await novu.trigger(identifier, {
    to: {
      subscriberId,
    },
    payload: {
      companyName: "ZIDIO",
      confirmationLink: activationURL,
      token: activationURL,
    },
  });
};

const subscriberExists = async (identifier) => {
  try {
    let subscriber = await novu.subscribers.get(identifier);
    //  console.log({yin:subscriber.status});
    //  return Boolean(subscriber);
    return subscriber.data ? true : false;
  } catch (error) {}
};

const updateSubscriber = async(subscriberId, data) => {
  await novu.subscribers.update(subscriberId, {
  data
  });
}

module.exports = {updateSubscriber, addNewSubscriber, sendMail };

