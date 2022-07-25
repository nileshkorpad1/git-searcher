import axios, { AxiosInstance } from 'axios';
import {
  GithubHeaderPaginationLinkParser,
  PaginationLinkParser,
} from '../entities/githubHeaderPaginationLinkParser';
import { User } from '../entities/dataEntities';

import { Repository } from '../entities/dataEntities';
import { assertFulfilled } from '../utils/assertFulfilled';

interface Query {
  query: string;
  page?: number;
}

export interface GithubSearchResponse<T> {
  total_count: number;
  items: T[];
  meta: {
    nextPage: number;
    lastPage: number;
  };
}

export interface GithubUsersDetailsResponse {
  id: number;
  name: string;
  avatar_url: string;
  description: string;
  html_url: string;
}

export class GithubApi {
  private readonly BASE_URL: string;
  private readonly PER_PAGE: number;

  private readonly client: AxiosInstance;
  private readonly paginationLinkParser: PaginationLinkParser;

  private readonly emptyGithubResponse = {
    total_count: 0,
    items: [] as any[],
    meta: { nextPage: 0, lastPage: 0 },
  };

  constructor(options?: {
    client?: AxiosInstance;
    BASE_URL?: string;
    PER_PAGE?: number;
    paginationLinkParser?: PaginationLinkParser;
  }) {
    this.BASE_URL = options?.BASE_URL ?? 'https://api.github.com';
    this.PER_PAGE = options?.PER_PAGE ?? 12;

    this.paginationLinkParser =
      options?.paginationLinkParser ?? new GithubHeaderPaginationLinkParser();

    this.client =
      options?.client ||
      axios.create({
        baseURL: this.BASE_URL,
      });
  }

  async getRepos({
    query,
    page = 1,
  }: Query): Promise<GithubSearchResponse<Repository>> {
    const response = await this.client.get<GithubSearchResponse<Repository>>(
      `/search/repositories?q=${query}&page=${page}&per_page=${this.PER_PAGE}`
    );

    const { data } = response;

    if (data && Array.isArray(data.items)) {
      const items = data.items.map((item) => ({
        id: item.id,
        full_name: item.full_name,
        description: item.description,
        language: item.language,
        html_url: item.html_url,
        updated_at: item.updated_at,
        stargazers_count: item.stargazers_count,
        license: item.license,
      }));
      const total_count = +data.total_count;

      const {
        lastPage,
        nextPage,
      } = this.paginationLinkParser.parsePaginationLink(response.headers.link);

      return {
        total_count,
        items,
        meta: {
          nextPage,
          lastPage,
        },
      };
    }

    return Promise.resolve(this.emptyGithubResponse);
  }

  async getUsers({
    query,
    page = 1,
  }: Query): Promise<GithubSearchResponse<User>> {
    const response = await this.client.get<GithubSearchResponse<User>>(
      `/search/users?q=${query}+type:org&page=${page}&per_page=${this.PER_PAGE}`
    );

    const { data } = response;

    if (data && Array.isArray(data.items) && data.items.length > 0) {
      const items = data.items.map((item) => ({
        id: item.id,
        login: item.login,
        name: '',
        description: '',
        html_url: item.html_url,
        avatar_url: item.avatar_url,
      }));

      const userDetails = items.map((item) => this.getUser(item.login));
      const resolvedDetails = await Promise.allSettled(userDetails);

      for (let i = 0; i < items.length && i < resolvedDetails.length; ++i) {
        if (assertFulfilled(resolvedDetails[i])) {
          const { description, name } = (resolvedDetails[
            i
          ] as PromiseFulfilledResult<GithubUsersDetailsResponse>).value;

          items[i].description = description;
          items[i].name = name;
        }
      }

      const total_count = +data.total_count;

      const {
        lastPage,
        nextPage,
      } = this.paginationLinkParser.parsePaginationLink(response.headers.link);

      return {
        total_count,
        items,
        meta: {
          nextPage,
          lastPage,
        },
      };
    }

    return Promise.resolve(this.emptyGithubResponse);
  }

  async getUser(
    login: string
  ): Promise<GithubUsersDetailsResponse> {
    const response = await this.client.get<GithubUsersDetailsResponse>(
      `/orgs/${login}`
    );
    const { data } = response;

    const user: GithubUsersDetailsResponse = {
      id: data.id,
      name: data.name,
      avatar_url: data.avatar_url,
      description: data.description,
      html_url: data.html_url,
    };

    return user;
  }
}
