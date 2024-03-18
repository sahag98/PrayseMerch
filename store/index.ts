import { proxy } from "valtio";

const state = proxy({
  intro: false,
  color: "#353934",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./prayse-logo.png",
  fullDecal: "./circuit.png",
});

export default state;
