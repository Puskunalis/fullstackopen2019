const blogs = [
  {
    title: "",
    author: "",
    url: "",
    likes: 0,
    user: {
      username: "asd",
      name: "ggg",
      id: "5dc5599c52f0e144b67525d7"
    },
    id: "5dce97ed094f434dd58749c3"
  },
  {
    title: "a",
    author: "b",
    url: "c",
    likes: 49,
    user: {
      username: "asd",
      name: "ggg",
      id: "5dc5599c52f0e144b67525d7"
    },
    id: "5dce9b18094f434dd58749c4"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }