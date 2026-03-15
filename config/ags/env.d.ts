declare module "*.scss" {
  const content: string
  export default content
}

declare module "gi://*" {
  const giModule: any
  export default giModule
}
