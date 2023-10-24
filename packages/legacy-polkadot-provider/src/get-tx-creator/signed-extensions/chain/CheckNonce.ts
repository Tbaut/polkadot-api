import { map } from "rxjs"
import { compact, u16, u32, u64 } from "@polkadot-api/substrate-bindings"
import type { GetChainSignedExtension } from "@/types/internal-types"
import { fromHex, toHex } from "@polkadot-api/utils"

const lenToDecoder = {
  2: u16.dec,
  4: u32.dec,
  8: u64.dec,
}

export const CheckNonce: GetChainSignedExtension = (ctx) =>
  ctx.chainHead
    .call$(ctx.at, "AccountNonceApi_account_nonce", toHex(ctx.from))
    .pipe(
      map((result) => {
        const bytes = fromHex(result)
        const decoder = lenToDecoder[bytes.length as 2 | 4 | 8]
        if (!decoder)
          throw new Error("AccountNonceApi_account_nonce retrieved wrong data")

        return {
          extra: compact.enc(decoder(bytes)),
          additional: new Uint8Array(),
          pjs: { nonce: decoder(bytes) },
        }
      }),
    )
