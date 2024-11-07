import { Button } from "@/app/_components/ui/button";
import { LogInIcon } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto max-w-[550px] flex flex-col h-full justify-center p-8">
        <Image
          src={"/logo.svg"}
          width={173}
          height={39}
          alt="Finance AI"
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-3">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>

        <Button variant="outline"> <LogInIcon className="mr-2" /> Fazer login ou criar conta</Button>
      </div>

      {/*DIREITA*/}
      <div className="relative h-full w-full">
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
