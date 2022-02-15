//auth
import { getSessionUser } from '../auth/getSessionUser'

//components
import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Pages/Home/Home'

//styles
import { Content } from '../styles/GlobalStyles'

export default function Homepage() {
  return (
    <>
      <Navbar />
      <Content>
        <Home />
      </Content>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const user = await getSessionUser(req)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      }
    }
  }

  return {
    props: {},
  }
}
