import { Codec } from "../types"
import { createCodec, decodeInt, encodeInt, IntType } from "../utils"

const u32Enc = encodeInt(IntType.u32)
const u32Dec = decodeInt(IntType.u32)

export const u32: Codec<number> = createCodec(u32Enc, u32Dec)
