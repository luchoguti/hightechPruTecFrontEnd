import Link from 'next/link';

const Navigation = () =>{
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/">
            <a className="navbar-brand">Home</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
      </nav>
    )
}

export default Navigation;