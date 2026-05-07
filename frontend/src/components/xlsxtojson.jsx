function XlsxToJson() {
    return(
        <>
        <form action="/convert" method="POST" enctype="multipart/form-data">
        <input type="file" name="convert" />
        <button type="submit">submit</button>
        </form>
        </>
    )
    
}


export default XlsxToJson