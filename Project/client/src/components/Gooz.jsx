import React , {useEffect} from 'react'

const Gooz = () => {


    useEffect(() => {
        async function fetchData() {
            const data = await fetch('http://localhost:8000');
            const pureData = await data.json();
            console.log(pureData);
        }

        fetchData();
    })

  return (
    <div>hello</div>
  )
}

export default Gooz