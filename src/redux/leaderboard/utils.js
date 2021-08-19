/* eslint-disable camelcase */
// eslint-disable-next-line import/prefer-default-export
export const attachStats = (profile) => {
  const {
    games_played_count,
    wins_count,
    losses_count,
    draw_count,
    winning_percentage,
  } = profile;
  return {
    [profile.username]: {
      games_played_count,
      wins_count,
      losses_count,
      draw_count,
      winning_percentage,
    },
  };
};
