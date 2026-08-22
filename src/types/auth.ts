export interface UserDto {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface ReissueResponseDto {
  accessToken: string;
}
