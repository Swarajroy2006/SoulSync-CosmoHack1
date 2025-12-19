import Nav from "../components/Nav";

const MainLayout = () => {
  return (
    // <div className="w-screen h-screen relative overflow-hidden">
    //   <Nav />
    //   {/* BACKGROUND */}
    //   <div
    //     style={{
    //       width: "100%",
    //       height: "100%",
    //       position: "relative",
    //       background: "black",
    //     }}
    //   >
    //     <LightRays
    //       raysOrigin="top-center"
    //       raysColor="rgb(236, 236, 243)"
    //       raysSpeed={1.0}
    //       lightSpread={1.3}
    //       rayLength={1.2}
    //       followMouse
    //       mouseInfluence={0.1}
    //       noiseAmount={0.1}
    //       distortion={0.05}
    //     />
    //   </div>

    //   {/* MAIN CONTENT */}
    //   <div className="absolute z-10 flex flex-col items-center justify-center h-full">
    //     <Hero />
    //     <Button />
    //   </div>

    //   <Outlet />
    // </div>
    <div style={{ color: "red", fontSize: "40px" }}>
      MAIN LAYOUT RENDERED
    </div>
    
  );
};

export default MainLayout;
