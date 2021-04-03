export const imgPath = (path) => {
  return path.replace(/.*uploads/, 'http://localhost:8090/uploads')
}