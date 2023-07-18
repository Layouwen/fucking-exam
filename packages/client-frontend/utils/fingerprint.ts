import FingerprintJS from '@fingerprintjs/fingerprintjs'

const fpPromise = FingerprintJS.load({
  monitoring: false,
})

export async function getFingerprint() {
  const fp = await fpPromise
  const result = await fp.get()
  return result.visitorId
}
