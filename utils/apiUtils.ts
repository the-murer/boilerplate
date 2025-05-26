import { CommandHandler, ValidationFunction } from "@/types/commandHandler";

import { NextResponse } from "next/server";
import { ZodIssue, ZodSchema } from "zod";
import { PaginationType } from "./pagination";

type PageFetcherProps = {
  data?: any;
  endPoint: string;
  method: string;
};

const BASE_API_PATH = "/api";

export const parseZodError = <T>(schema: ZodSchema, data: T) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors.map(
        (error: ZodIssue) =>
          `Validation error "${error.path.join(",")}": ${error.message}`
      ),
    };
  }
  return result.data;
};

export const apiHandler = async (
  data: any,
  validationFunction: ValidationFunction,
  handlerFunction: CommandHandler<any, any>
) => {
  const { errors, success } = validationFunction(data);
  if (success === false) {
    return NextResponse.json(
      {
        success,
        errors,
      },
      {
        status: 422,
      }
    );
  }

  const response = await handlerFunction(data);
  return NextResponse.json(response);
};

export const pageFetcher = async ({
  data,
  endPoint,
  method,
}: PageFetcherProps) => {
  const response = await fetch(`${BASE_API_PATH}/${endPoint}`, {
    method,
    ...(data && { body: JSON.stringify(data) }),
  });
  const parsedResponse = await response.json();

  if (!parsedResponse.success) {
    throw new Error(parsedResponse.errors.join("\n"));
  }
  return parsedResponse;
};

export const getQueryString = (params: PaginationType) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};
