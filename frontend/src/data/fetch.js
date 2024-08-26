export const LoadPosts = async () =>{
  const res = await fetch ('http://localhost:5000/blogPosts')
  const data = await res.json();
  return data
}

export const NewPost = async (formValue) =>{
  const res= await fetch ('http://localhost:5000/blogPosts', {
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formValue)
  })
  const data = await res.json()
  LoadPosts()
  return data
}
