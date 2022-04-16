import { i8 } from "../"
import { testCodec } from "../test-utils"

const tester = testCodec(i8)

describe("i8", () => {
  it("zero", () => {
    tester(0, "0x00")
    expect(i8.dec(new Uint8Array([0]))).toEqual(0)
    expect(i8.dec(new Uint8Array([0]).buffer)).toEqual(0)
  })

  it("-1", () => {
    tester(-1, "0xff")
  })

  it("max", () => {
    tester(15, "0x0f")
  })

  it("min", () => {
    tester(-16, "0xf0")
  })
})
