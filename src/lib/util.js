const local = 'http://localhost:8090/uploads'
const prod = 'http://121.89.217.223:8090/uploads'
export const imgPath = (path) => {
  return path.replace(/.*uploads/, prod)
}