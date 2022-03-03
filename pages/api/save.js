// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { saveOrder } from '../../utils/DBUtils'

export default async function handler(req, res) {
  const saveStatus = await saveOrder(req.query);
  res.status(200).json({ status: saveStatus ? 'success' : 'error' })
}
