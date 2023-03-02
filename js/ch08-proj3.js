/* add code below this */

const companiesObj = JSON.parse(content);

function CompanyCard(company) {
   this.symbol = company.symbol;
   this.name = company.companyName;
   this.day50 = company.stats.day50MovingAvg;
   this.day200 = company.stats.day200MovingAvg;
   this.revenue = company.stats.operatingRevenue;
   this.marketCap50 = company.stats.day50MovingAvg * company.stats.sharesOutstanding;
   this.marketCap200 = company.stats.day200MovingAvg * company.stats.sharesOutstanding;
   this.equity = company.stats.totalAssets - company.stats.totalLiabilities;
   this.tags = company.tags;

   this.currency = (num) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: 'USD',
      });
      return formatter.format(num);
   };

   this.billions = (num) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: 'USD',
         notation: 'compact',
         compactDisplay: 'short',
      });
      return formatter.format(num);
   };

   CompanyCard.prototype.outputCard = function() {
      const marketCap50Formatted = this.billions(this.marketCap50);
      const marketCap200Formatted = this.billions(this.marketCap200);
      const revenueFormatted = this.billions(this.revenue);
      const equityFormatted = this.billions(this.equity);

      const tagsList = this.tags.map(tag => `<li>${tag}</li>`).join('');

      return `
    <div class="card">
      <h2>${this.symbol}</h2>
      <h3>${this.name}</h3>
      <ul>
        <li>50 Day Moving Avg: ${this.currency(this.day50)}</li>
        <li>200 Day Moving Avg: ${this.currency(this.day200)}</li>
        <li>Operating Revenue: ${revenueFormatted}</li>
        <li>Market Cap (50 Day): ${marketCap50Formatted}</li>
        <li>Market Cap (200 Day): ${marketCap200Formatted}</li>
        <li>Equity: ${equityFormatted}</li>
        <li>Tags:</li>
        <ul>
          ${tagsList}
        </ul>
      </ul>
    </div>
  `;
   }
}
function outputCompanyCards(companiesObj) {

   const newMarkup = companiesObj.map(company => {
      const card = new CompanyCard(company)
      const cardMarkup = card.outputCard()
      return cardMarkup;
   }).join('');
   document.getElementById('company-cards').innerHTML = newMarkup
}

outputCompanyCards(companiesObj);









