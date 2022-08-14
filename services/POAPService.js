const POAP = require('../models/POAP')

function get() {
  const query = POAP.find({}).lean();

  return query;
}

function getById(messageId) {
  const query = POAP.findOne({ messageId }).lean();

  return query;
}

function create(messageId) {
  const newPOAP = new POAP({
    messageId,
    maxAmount: 0,
    claimed: 0,
    poapName: "",
    poapImage: "",
    owners: [],
    codes: []
  });

  return newPOAP.save()
}

async function canClaim(messageId, userId) {
  const query = await POAP.findOne({ messageId, owners: userId }).lean();

  if (!query) return true

  return false;
}

async function claim(messageId, userId) {
  const claimAvailable = await canClaim(messageId, userId)
  if (!claimAvailable) return { err: true, msg: 'You have already claimed this POAP' };
  const poap = await getById(messageId)

  if (poap.codes.length == 0 || poap.maxAmount == 0) return { err: true, msg: 'The data of this POAP is not ready, please try again in a few seconds' }
  if (poap.claimed >= poap.maxAmount || poap.codes.length < poap.claimed) return { err: true, msg: 'You need to be faster, this POAP is already sold out' }

  return POAP.findOne(
    { messageId: messageId }
  ).lean();
}

async function updateOwner(messageId, userId) {
  const claimAvailable = await canClaim(messageId, userId)
  if (!claimAvailable) return { err: true, msg: 'You have already claimed this POAP' };

  return POAP.findOneAndUpdate(
    { messageId: messageId },
    {
      $push: { owners: userId },
      $inc: { claimed: 1 }
    }, { new: true }
  );
}

module.exports = {
  get,
  getById,
  create,
  canClaim,
  claim,
  updateOwner
}