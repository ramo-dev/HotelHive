const getQuery =  async (search:any) => {
    const res = await fetch(`https://hotelhive-backend.onrender.com/api/search/${search}`)
    const data = await res.json()
    return data
}

export default getQuery;