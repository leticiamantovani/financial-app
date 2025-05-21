import { Button } from "@/app/_components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen">
      {/* Parte superior – login (2/3) */}
      <div className="flex flex-col justify-center items-center px-6 py-12 flex-grow h-2/3 lg:h-full max-w-xl w-full mx-auto text-center lg:text-left lg:items-start">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="Finance AI"
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-3">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" /> Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>

      {/* Parte inferior – imagem (1/3 + altura mínima) */}
      <div className="relative w-full h-1/3 min-h-[280px] lg:h-full">
        <Image
          src="/login-page.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
