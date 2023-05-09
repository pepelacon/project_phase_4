// import "./NavBar.css"
// import "./SearchBar.css"


function SearchBar({ setSearch }) {

    function handleChange(e) {
        setSearch(e.target.value)
    }

    return(
        <div>
            <input className="input" type="text" placeholder="Search..." onChange={handleChange} >

            </input>
        </div>
    )
}

export default SearchBar;