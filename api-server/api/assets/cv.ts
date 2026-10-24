import type { VercelRequest, VercelResponse } from '@vercel/node'
import { applyCors } from '../../lib/cors.js'
import { handleAssetUpload } from '../../lib/uploadAsset.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return
  return handleAssetUpload(req, res, 'cv_file', ['application/pdf'])
}
