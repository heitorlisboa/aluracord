import { createContext } from "react";
import type { MobileContextInterface } from "../types";

const MobileContext = createContext<MobileContextInterface | null>(null);

export default MobileContext;
