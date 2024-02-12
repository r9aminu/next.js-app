// Function to generate the static paths for profiles
export async function getStaticPaths() {
    // Get profile data from the API
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    
    // Go through profiles to generate paths for each profile page
    const paths = users.map((user) => ({
      params: { id: user.id.toString() },
    }));
    
    // Show only fully generated page; otherwise block request
    return { paths, fallback: 'blocking' };
  }
  
  // Function to fetch data for a specific profile
  export async function getStaticProps({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    const user = await res.json();
    
    // Return profile data as props to be passed to the Profile component
    return { props: { user } };
  }
  
  // Profile component to render the profile elements you choose
  export default function Profile({ user }) {
    return (
      <div>
        <h1>{user.name}</h1>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>City: {user.address.city}</p>
      </div>
    );
  }
  