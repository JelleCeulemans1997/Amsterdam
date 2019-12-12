import { RoleActions, DEVELOPER, COMPANY, ADMIN, LOGOUT } from './role.actions';

export interface State {
  Developer: boolean;
  Company: boolean;
  Admin: boolean;
}

const initialState: State = {
  Developer: false,
  Company: false,
  Admin: false
};

export function roleReducer(state = initialState, action: RoleActions) {
  switch (action.type) {
    case DEVELOPER:
      return {
        Developer: true,
        Company: false,
        Admin: false
      };
    case COMPANY:
      return {
        Developer: false,
        Company: true,
        Admin: false
      };
    case ADMIN:
      return {
        Developer: false,
        Company: false,
        Admin: true
      };
    case LOGOUT:
        return {
          Developer: false,
          Company: false,
          Admin: false
        };
    default: {
      return state;
    }
  }
}

export const getWhichRole = (state: State) => state;
