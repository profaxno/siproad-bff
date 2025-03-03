import { InputType } from "@nestjs/graphql";
import { LoginInput } from "./login.input";

@InputType()
export class ResetPasswordInput extends LoginInput{}