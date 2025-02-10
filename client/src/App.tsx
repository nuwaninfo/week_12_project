import { useState } from "react"

function App() {
  const [name, setName] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [pages, setPages] = useState<number>(0)

  const fetchData = async (name: string, author: string, pages: number) => {
    console.log("test")
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          author: author,
          pages: pages,
        }),
      })

      if (!response.ok) {
        throw new Error("Error fecthing data")
      }
      const data = await response.json()
      console.log(data.data.name)
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error when trying save data: ${error.message}`)
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("submit")
  }

  return (
    <>
      <h1>books</h1>
      <form onSubmit={handleSubmit}>
        name:
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        author:
        <br />
        <input
          type="text"
          id="author"
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        pages:
        <br />
        <input
          type="number"
          id="pages"
          name="pages"
          onChange={(e) => setPages(Number(e.target.value))}
        />
        <br />
        <br />
        <input
          type="submit"
          value="Submit"
          onClick={() => fetchData(name, author, pages)}
        />
      </form>
    </>
  )
}

export default App
