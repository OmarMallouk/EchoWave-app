import { useState } from "react";

interface LoginFormProps{
    onLogin: (email: string, password: string) => void;
}

