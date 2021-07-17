import { useState, useEffect } from "react";

import Layout from "@/components/MainLayout";
import { supabase } from "@/lib/suppabase";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    const user = supabase.auth.user();
    setUser(user);
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser()
    );
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
