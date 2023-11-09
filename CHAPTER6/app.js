// Get the DOM elements for the filters
const filter_year = document.querySelector('#year');
const filter_month = document.querySelector('#month');
const filter_dname = document.querySelector('#dname');
// Create a set of unique years from the data and sort it
let years = new Set(data.map(d=>d.year_save));
years = [...years].sort();
// Clear the year filter and populate it with the sorted years
filter_year.innerHTML = '';
for(let y of years){
 filter_year.innerHTML += `<option>${y}</option>`; 
}
// Reset the month filter
resetMonth();
// Function to reset the month filter based on the selected year
function resetMonth() {
  // Find the selected year
const selected_year = filter_year.value;

  // Filter data by selected year
const filtered_data = data.filter(d =>d.year_save==selected_year);
  // Create a set of unique months from the focused data and sort it
let month = new Set(filtered_data.map(d=>d.month_save));
month = [...month].sort((a, b) => 
{
  months_th.indexOf(a) - months_th.indexOf(b);
})
  // Clear the month filter and populate it with the sorted months
  filter_month.innerHTML = '';
  for(let m of month){
   filter_month.innerHTML += `<option>${m}</option>`;}
  // Reset the dname filter
resetDname();}
// Function to reset the dname filter based on the selected year and month
function resetDname() {
  // Find the selected year and month
const selected_year = filter_year.value
const selected_month = filter_month.value
  // Filter data by selected year and month
const filtered_data = data.filter(
 d => d.year_save == selected_year && d.month_save == selected_month

)
  // Create a set of unique dnames from the focused data and sort it
let dname = new Set(
  filtered_data.map(d=> d.dname)
);
dname = [...dname].sort();
  // Clear the dname filter and populate it with the sorted dnames
filter_dname.innerHTML = '';
for(let d of dname) {filter_dname.innerHTML += `<option>${d}</option>`}
  // Show the chart based on the selected filters
showChart();
}

// Function to show a chart based on the selected filters
function showChart() {
  // Find the selected year, month, and district
  const selected_year = filter_year.value
  const selected_month = filter_month.value
  const selected_dname = filter_dname.value
  // Filter the data based on the selected filters
 const filtered_data = data.filter(
  d => d.year_save == selected_year
  && d.month_save == selected_month 
  && d.dname == selected_dname
 )[0];
console.log(filtered_data);
  // Prepare the labels and data for the chart
const x_tick = Array.from(
  {length:100},
  (value, index) => index+1 );
//const x_tick = [];
  //for(let i = 0; i<100; i++) {
  //x_tick.push(i); }
const chart_data = Array.from(
 x_tick,(v, i) => filtered_data['age'+v]);
console.log(x_tick);
console.log(chart_data);
  // Get the chart element and clear it 
const chart = document.querySelector('#chart');
chart.innerHTML = '<canvas></canvas>';
  // Create a new Chart.js bar chart with the prepared labels and data
new Chart(chart.querySelector('canvas'), {
type:'bar', 
data:{
 labels: x_tick,
 datasets: [{
 label: 'จำนวนประชากร',
 data: chart_data
}]
},
 options:{
 scales: {
  x: {
  title: {
  display: true,
  text: 'Age'  
     }
    }
   }
  }
}
);
  // Calculate the mean age
 let sumAge = 0;
 let sumPopulation = 0;
 for(let i = 0; i < chart_data.length; i++ ) {
 sumAge += (x_tick[i] * chart_data[i]);
 sumPopulation += chart_data[i];
 }
 const mean = sumAge / sumPopulation;
 document.querySelector('#mean').innerHTML = mean.toFixed(1);
  // Calculate the median age
 const mid = Math.ceil(sumPopulation / 2);
 const sorted = [];
 let i = 0;
 while(sorted.length < mid) {
 for(let j = 0; j < chart_data[i]; j++){
 sorted.push(x_tick[i]); 
 } i++;
 }
 let median;
 if(sumPopulation % 2 == 0){
  median = (sorted[mid-1-1] + sorted[mid-1]) /2;
 }
 else{
  median = sorted[mid-1];
 }
 document.querySelector('#median').innerHTML = median.toFixed(1);
  // Calculate the mode age
 let mode = 1;
 let max = chart_data[0];
 for (let i = 1; i < chart_data.length; i++){
 if(chart_data[i] > max ) {
 max = chart_data[i];
 mode = x_tick[i];
 }}
 document.querySelector('#mode').innerHTML = mode.toFixed(1);
  // Calculate the variance
 let sumSquare = 0;
 for(let i = 0; i < chart_data.length; i++){
 sumSquare += ((x_tick[i] - mean) ** 2) * chart_data[i]; 
 }
 const variance = sumSquare / sumPopulation;
 document.querySelector('#var').innerHTML = variance.toFixed(1);
  // Calculate the standard deviation
 const sd = variance ** 0.5;
 document.querySelector('#sd').innerHTML = sd.toFixed(1);
}
