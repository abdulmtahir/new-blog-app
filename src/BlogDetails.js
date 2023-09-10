import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {

    const { id } = useParams()
    const { data: blog, isPending, error } = useFetch('http://localhost:8000/blogs/' + id)

    const history = useHistory()

    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/'+ blog.id, {
            method: 'delete'
        }).then( () => {
            history.push('/')
        } )
    }

    return ( 
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { blog && (
                <article>
                    <h2> {blog.title} </h2>
                    <p>Written by {blog.author}</p>
                    <div>{ blog.body }</div>
                </article>
            ) }
            <button onClick={handleDelete}>delete blog</button>
        </div>
     );
}
 
export default BlogDetails;