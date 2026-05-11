export default function Home() {
  return (
    <>
      <h1 className="text-center m-5">Welcome to my Recipe Browser project!</h1>
      <p className="m-3">
        The goal of this project is for me to learn Next.js in an interactive way. I am following this document:{' '}
        <a href="/recipe-manager-project-spec.md" className="text-blue-500" download>
          Recipe Manager Project
        </a>
      </p>
      <p className="m-3">This self-directed learning project will build your competency in modern full-stack web 
        development using React 19, Next.js 16+ (App Router), PostgreSQL, and authentication. 
        You'll create a recipe sharing platform where users can browse recipes publicly and create 
        their own recipes after authentication.</p>
    </>
  );
}
