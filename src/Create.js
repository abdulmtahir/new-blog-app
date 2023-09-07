import { useState } from "react";

const Create = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("mario");
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new-blog is added')
            setIsPending(false)
        })

    }

    return ( 
        <div className="create">
            <h2> Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Blog body</label>
                <textarea
                    required
                    onChange={(e) => setBody(e.target.value)}
                />

                <label>Blog author:</label>
                <select 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add a blog</button> }
                { isPending && <button disabled>Adding...</button> }
                
            </form>
        </div>
     );
}
 
export default Create;