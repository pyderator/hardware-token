import _ from "lodash";
import { STATUS } from "@prisma/client";
import { generateHexArrays } from "../utils/createHexArray";

// Batch for hex array generation
export const batchHashes = async (
  keys: Array<{
    id: string;
    productKey: string;
    isActive: STATUS;
    hash: string;
  }>
) => {
  const generatedHexArrays = generateHexArrays(keys);
  const gGeneratedHexArrays = _.groupBy(generatedHexArrays, "id");
  return keys.map((k) => gGeneratedHexArrays[k.id][0].hexArray || undefined);
};
