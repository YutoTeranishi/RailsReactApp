import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

var target_dom = null;

document.addEventListener('DOMContentLoaded',() =>{
  target_dom = document.querySelector('#data');
  const url = new URL(location.href);
  let f = url.searchParams.get("name");
  if(f==null){
    f = '';
  }
  getData(f);
});

function getData(f){
  let url = "http://localhost:3000/data/ajax";
  /*
  if (f!=''){
    url += '?name=' + f;
  }
  */
  fetch(url)
  .then(
    res => res.json(),
    (error) => {
      const el = (
        <p>ERROR!</p>
      );
      ReactDom.render(el, target_dom);
    }
  )
  .then(
    (result) => {
    console.log(result);

    let arr = [];

      /*
      for(let n in result){
        let val = result[n];
        arr.push(<li class="list-group-item">
        {val.id}:{val.name}({val.mail})</li>);
      }
      const el = (
        <ul class="list-grop">{arr}</ul>
      );
      */
      for(let n in result.rss.channel.item){
        let data = result.rss.channel.item[n];
        arr.push(
          <tr>
            <th><a href={data.link}>{data.title}</a></th>
            <td class="small">{data.pubDate}</td>
          </tr>
        );
      }
      let dataH = result.rss.channel;
      const el = (
        <table class="table mt-4">
          <thead class="thead-dark">
            <tr>
              <th><a href={dataH.link}>{dataH.title}</a></th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{arr}</tbody>
        </table>
      );

      ReactDOM.render(el,target_dom);
    },
    (error) => {
      const el = (
        <p>ERROR!!</p>
      );
      ReactDOM.render(el,target_dom);
    }
  );
}
