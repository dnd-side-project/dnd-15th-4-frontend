export interface UserDto {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}

export interface ReissueResponseDto {
  accessToken: string;
}
