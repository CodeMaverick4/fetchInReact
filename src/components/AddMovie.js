import React, { useCallback, useState } from "react"

const AddMovieForm = () => {
    const [movieData, setMovieData] = useState({ title: '', openingText: '', releaseDate: '' });
    
    const handleChange = (e) => {
        setMovieData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e, movie) => {
            e.preventDefault();
            try {
                const response = await fetch("https://react-http-c6392-default-rtdb.firebaseio.com/movies.json", {
                    method: 'POST',
                    body: JSON.stringify(movie),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }
                const data = await response.json();
                console.log(data);
                setMovieData({ title: '', openingText: '', releaseDate: '' })
            } catch (err) {                
                console.log(err)
            }
        }
    

    return (
        <section>
            {/* <form action={handleSubmit} > */}
            <div className="input-css">
                <label htmlFor="">Title </label>
                <input type="text" name="title" onChange={handleChange} />
            </div>

            <div className="input-css">
                <label htmlFor="">Opening Text </label>
                {/* <input type="text" /> */}
                <textarea id="" name="openingText" onChange={handleChange}></textarea>
            </div>

            <div className="input-css">
                <label htmlFor="">Release Date </label>
                <input type="text" name="releaseDate" onChange={handleChange} />
            </div>

            <button onClick={(e)=>handleSubmit(e,movieData)} >Add Movie</button>
            {/* </form> */}
        </section>
    )
}

export default React.memo(AddMovieForm)