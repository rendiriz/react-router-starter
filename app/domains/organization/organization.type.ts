export interface Organization {
  id: string;
  slug: string;
  name: string;
}

export interface PaginatedOrganization {
  data: Organization[];
  // meta: {
  //   pagination?: Pagination;
  // };
}
