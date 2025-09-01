import React, { useState } from "react"

const AddMovieForm = () => {
    const [movieData, setMovieData] = useState({ title: '', openingText: '', releaseDate: '' });
    const handleChange = (e) => {
        setMovieData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(movieData);
    }
    // console.log("re render")
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

                <button onClick={handleSubmit} >Add Movie</button>
            {/* </form> */}
        </section>
    )
}

export default React.memo(AddMovieForm)