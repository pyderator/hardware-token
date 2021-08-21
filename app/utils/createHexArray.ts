import { STATUS } from "@prisma/client";

export const createHexArray = (secret: string) => {
  var char_array = secret.split("");
  var charcode_array = char_array.map(function (c) {
    return c.charCodeAt(0);
  });
  var hex_array = "{";
  for (let i = 0; i < charcode_array.length; i++) {
    if (i > 0) hex_array += ", ";
    hex_array += "0x" + charcode_array[i].toString(16);
  }
  hex_array += "}";
  return hex_array;
};

export const generateHexArrays = (
  secrets: Array<{
    id: string;
    productKey: string;
    isActive: STATUS;
    hash: string;
  }>
) => {
  const hexSecrets: Array<{ id: string; hexArray: string }> = [];
  secrets.map((h) =>
    hexSecrets.push({ id: h.id, hexArray: createHexArray(h.hash) })
  );
  return hexSecrets;
};
