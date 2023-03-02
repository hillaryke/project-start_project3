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

   CompanyCard.prototype.outputCard = function () {
      const marketCap50Formatted = this.billions(this.marketCap50);
      const marketCap200Formatted = this.billions(this.marketCap200);
      const revenueFormatted = this.billions(this.revenue);
      const equityFormatted = this.billions(this.equity);

      const tagsList = this.tags.map(tag => `<li>${tag}</li>`).join('');

      return `
         <article class="card">
               <h2>AAPL - Apple Inc.</h2>
               <div>
                 <p>Share Price (50day avg): <span>$182.26</span></p>
                 <p>Share Price (200day avg): <span>$190.30</span></p>
                 <p>Market Cap (50day avg): <span>$859,406,932,800.00</span></p>
                 <p>Market Cap (200day avg): <span>$897,317,784,000.00</span></p>
                 <p>Net Revenue: <span>$32,031,000,000.00</span></p>
                 <p>Shareholder Equity: <span>$117,892,000,000.00</span></p>
               </div>
               <footer>
                   <small>Technology</small> 
                   <small>Consumer Electronics</small>
                   <small>Computer Hardware</small>
               </footer>
            </article>
  `;
   };
}

function outputCompanyCards(companiesObj) {

   const newMarkup = companiesObj.map(company => {
      const card = new CompanyCard(company);
      const cardMarkup = card.outputCard();
      return cardMarkup;
   }).join('');
   document.getElementById('company-cards').innerHTML = newMarkup;
}

outputCompanyCards(companiesObj);









