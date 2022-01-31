import { createContext } from "react";
import type { UserContextInterface } from "../types";

const UserContext = createContext<UserContextInterface | null>(null);

export default UserContext;
