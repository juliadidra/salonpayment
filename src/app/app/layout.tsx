import jwt from "jsonwebtoken"
import { getCookies } from "next-client-cookies/server";
import { redirect } from "next/navigation";

const AUTH_TOKEN = process.env.AUTH_TOKEN as string;

const Layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const cookies = getCookies();
    const auth = cookies.get("auth");

    if(auth) {
      try {
        jwt.verify(auth, AUTH_TOKEN);
        const decoded = jwt.decode(auth);

        return (
            <>
              {children}
            </>
        );

      } catch (error) {
        redirect("/");
      }
    }

    redirect("/");

}
 
export default Layout;