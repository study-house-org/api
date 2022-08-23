import { IndexName } from "@/sync/mapping";
import { Context } from "@/tracing";
import {
  ElasticSearchSearchConfig,
  ElasticSearchSearchDriver,
} from "./elasticsearch";

export interface SearchCriteria {
  query?: string;
  filters?: {
    or?: {
      [key: string]: string | number;
    }[];
    and?: {
      [key: string]: string | number;
    }[];
  };
}

export interface SearchDriver {
  search(
    ctx: Context | null,
    index: IndexName,
    criteria: SearchCriteria
  ): Promise<string[]>;
}

export interface SearchConfig {
  driver: "elasticsearch";
  config: ElasticSearchSearchConfig;
}

export const createSearchDriver = ({ driver, config }: SearchConfig) => {
  switch (driver) {
    case "elasticsearch":
      return new ElasticSearchSearchDriver(config);
  }
};