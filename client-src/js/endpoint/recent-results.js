import axios from "axios";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";

import { API_URL } from "./../app.js";
import ResultTable from "./../component/table.jsx";

export default class RecentResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = { game_results: null };
  }

  static propTypes = { history: ReactRouterPropTypes.history }

  componentDidMount() {
    axios.get(API_URL + "/game_results")
      .then(response => this.setState({game_results: response.data}));
  }

  render() {
    return (
      <div>
        <ResultTable
          table={this.state.game_results}
          schema={
            [
              {
                columnLabel:"First Bot",
                render: row => {
                  if(row.bots.length > 0 && row.bots.length >= 2)
                    return row.bots[0].name;
                }
              },
              {
                columnLabel:"Second Bot",
                render: row => {
                  if(row.bots.length > 0 && row.bots.length >= 2)
                    return row.bots[1].name;
                }
              },
              {
                columnLabel:"Map",
                fieldName:"map"
              },
              {
                columnLabel:"Winner",
                fieldName:"winner_name",
                onClick: row => {
                  this.props.history.push(`/bot/?bot_id=${row.winner_id}`);
                }
              },
              {
                columnLabel:"Replay",
                fieldName:"replay",
                sortable: false,
                render: row => {
                  if (row.replay)
                    return <form method="get" action={row.replay}>
                      <button className="btn">Download</button>
                    </form>;
                  else return <div>Replay missing</div>;
                }
              },
            ]
          }/>
      </div>
    );
  }
}
