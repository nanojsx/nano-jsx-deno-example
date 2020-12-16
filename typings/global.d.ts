// fixes an issue in std@0.80.0
interface ReadableStream<R> {
  getIterator(): any
}
